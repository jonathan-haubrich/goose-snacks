export default function GooseSnacksTableHeader() {
  return (
    <thead>
      <tr className="bg-cyan-600 bg-opacity-50">
        <th className="py-2 px-1 sm:px-2 md:px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
          Votes
        </th>
        <th className="py-2 px-1 sm:px-2 md:px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
          Image
        </th>
        <th className="py-2 px-1 sm:px-2 md:px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap hidden md:table-cell">
          Product
        </th>
        <th className="py-2 px-1 sm:px-2 md:px-3 text-right border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
          Price
        </th>
        <th className="py-2 px-1 sm:px-2 md:px-3 text-right border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
          Goose Price
        </th>
      </tr>
    </thead>
  )
}