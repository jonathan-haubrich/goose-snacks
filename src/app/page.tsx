import Image from "next/image"
import { PrismaClient } from '@prisma/client';
import { Product } from '../../types/product';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function GooseSnacksTable() {
  const products = await prisma.product.findMany();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-600 via-purple-900 to-cyan-600">
      <div className="w-full max-w-4xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-5xl font-bold text-white text-center" style={{ textShadow: "4px 4px 0px cyan, 8px 8px 0px magenta" }}>
          Goose Snacks
        </h1>
      </div>
      <table className="border border-fuchsia-500">
        <thead>
          <tr className="bg-cyan-600 bg-opacity-50">
            <th className="py-2 px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">Image</th>
            <th className="py-2 px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">Product</th>
            <th className="py-2 px-3 text-right border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">Cost</th>
            <th className="py-2 px-3 text-right border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">Goose Price</th>
          </tr>
        </thead>
        <tbody>
            {products.map((product) => {
              const _product = Product.fromData(product);        
              return (
                <tr 
                  key={_product.id} 
                  className="border-b border-fuchsia-500 bg-black bg-opacity-75 hover:bg-opacity-90 transition-colors duration-200"
                >
                  <td className="py-2 px-3 border-r border-fuchsia-500">
                    <div className="relative w-100 h-100 overflow-hidden border border-fuchsia-500">
                      <Image
                        src={_product.imageUrl}
                        alt={_product.name}
                        width={200}
                        height={200}
                        className="transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3 font-medium border-r border-fuchsia-500 text-fuchsia-300 text-outline">{_product.name}</td>
                  <td className="py-2 px-3 text-right border-r border-fuchsia-500 text-cyan-300 text-outline">{_product.fullPrice}</td>
                  <td className="py-2 px-3 text-right text-fuchsia-300 text-outline">
                    ${_product.calcGoosePrice().toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}