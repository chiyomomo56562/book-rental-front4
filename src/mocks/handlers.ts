import { http, HttpResponse } from 'msw';

const API_BASE_URL = '/api';

const books = [
  {
    id: '1',
    title: '리액트 디자인 패턴',
    status: 'AVAILABLE' as const,
  },
  {
    id: '2',
    title: '자바스크립트 완벽 가이드',
    status: 'RENTED' as const,
  },
];

const rentalHistories: Record<string, any[]> = {
  '1': [],
  '2': [
    {
      id: 'h1',
      rentedAt: '2024-04-20T10:00:00Z',
      returnedAt: null,
    },
  ],
};

export const handlers = [
  http.get(`${API_BASE_URL}/books`, () => {
    return HttpResponse.json({
      status: 200,
      data: books,
      error: null,
    });
  }),

  http.get(`${API_BASE_URL}/books/:id`, ({ params }) => {
    const { id } = params;
    const book = books.find((b) => b.id === id);
    if (!book) {
      return HttpResponse.json(
        {
          status: 404,
          data: null,
          error: { message: '도서를 찾을 수 없습니다.', code: 'NOT_FOUND', status: 404 },
        },
        { status: 404 },
      );
    }
    return HttpResponse.json({
      status: 200,
      data: book,
      error: null,
    });
  }),

  http.post(`${API_BASE_URL}/books`, async ({ request }) => {
    const body = (await request.json()) as { title: string };
    const newBook = {
      id: String(books.length + 1),
      title: body.title,
      status: 'AVAILABLE' as const,
    };
    books.push(newBook);
    rentalHistories[newBook.id] = [];
    return HttpResponse.json(
      {
        status: 201,
        data: newBook,
        error: null,
      },
      { status: 201 },
    );
  }),

  http.get(`${API_BASE_URL}/books/:id/rentals`, ({ params }) => {
    const { id } = params as { id: string };
    return HttpResponse.json({
      status: 200,
      data: rentalHistories[id] || [],
      error: null,
    });
  }),

  http.post(`${API_BASE_URL}/books/:id/rentals`, ({ params }) => {
    const { id } = params as { id: string };
    const book = books.find((b) => b.id === id);
    if (book && book.status === 'AVAILABLE') {
      book.status = 'RENTED';
      const newHistory = {
        id: `h${Math.random().toString(36).substr(2, 9)}`,
        rentedAt: new Date().toISOString(),
        returnedAt: null,
      };
      if (!rentalHistories[id]) rentalHistories[id] = [];
      rentalHistories[id].unshift(newHistory);
      return HttpResponse.json({
        status: 200,
        data: true,
        error: null,
      });
    }
    return HttpResponse.json(
      {
        status: 400,
        data: false,
        error: { message: '대여 불가능한 도서입니다.', code: 'BAD_REQUEST', status: 400 },
      },
      { status: 400 },
    );
  }),

  http.patch(`${API_BASE_URL}/books/:id/rentals/return`, ({ params }) => {
    const { id } = params as { id: string };
    const book = books.find((b) => b.id === id);
    if (book && book.status === 'RENTED') {
      book.status = 'AVAILABLE';
      const history = rentalHistories[id]?.find((h) => h.returnedAt === null);
      if (history) {
        history.returnedAt = new Date().toISOString();
      }
      return HttpResponse.json({
        status: 200,
        data: true,
        error: null,
      });
    }
    return HttpResponse.json(
      {
        status: 400,
        data: false,
        error: { message: '반납 가능한 상태가 아닙니다.', code: 'BAD_REQUEST', status: 400 },
      },
      { status: 400 },
    );
  }),
];
