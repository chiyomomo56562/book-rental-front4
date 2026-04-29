import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <div className="border rounded-lg overflow-hidden">
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

export const THead = ({ children }: { children: ReactNode }) => (
  <thead className="bg-gray-50 border-b">{children}</thead>
);

export const TBody = ({ children }: { children: ReactNode }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

export const TR = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <tr className={`hover:bg-gray-50 transition-colors ${className}`}>{children}</tr>
);

export const TH = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <th className={`px-4 py-3 font-semibold text-gray-700 ${className}`}>{children}</th>
);

export const TD = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-gray-600 ${className}`}>{children}</td>
);
