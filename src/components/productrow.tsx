"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../types/product";

async function getVoteCount(productId: number) {
    const response = await fetch(`/api/votes?productId=${productId}`);
    const data = await response.json();

    return data;
}

interface PriceModifiers {
    profitPercentage: number;
    roundingModifier: number;
}

interface ProductRowProps {
    product: Product; // Use the Product type here
    priceModifiers: PriceModifiers; // Use PriceModifiers for the priceModifiers prop
}

export default function ProductRow({ product, priceModifiers }: ProductRowProps) {
    const [votes, setVotes] = useState(0);
    const [yourVotes, setYourVotes] = useState(0);
    const [goosePrice, setGoosePrice] = useState(0);
  
    useEffect(() => {
      async function loadData() {
        const voteData = await getVoteCount(product.id);
        setVotes(voteData.votes);
        setYourVotes(voteData.yourVotes);
        
        const calculatedGoosePrice = await product.calcGoosePrice(priceModifiers.profitPercentage, priceModifiers.roundingModifier);
        setGoosePrice(calculatedGoosePrice);
      }
      
      loadData();
    }, [product]);

    // Function to increase votes by 1 when clicked
    const handleVote = async () => {
        // Optionally, send the new vote count to your server
        await fetch("/api/votes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: product.id
        }),
        });

        // Optionally update yourVotes if the vote is personal
        const { votes, yourVotes } = await getVoteCount(product.id);
        setVotes(votes);
        setYourVotes(yourVotes);
    };
  
    return (
        <tr className="border-b border-fuchsia-500 bg-black bg-opacity-75 hover:bg-opacity-90 transition-colors duration-200">
          <td className="py-2 px-3 font-medium border-r border-fuchsia-500 text-fuchsia-300 text-outline">
            <div className="flex p-4 justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-fuchsia-500">Total</span>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 stroke-black stroke-1">
                  {votes}
                </div>
              </div>
    
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-fuchsia-500">Yours</span>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 stroke-black stroke-1">
                  {yourVotes}
                </div>
              </div>
            </div>
            <button
              onClick={handleVote}
              className="mt-2 py-1 px-3 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition-all"
            >
              Vote
            </button>
          </td>
          <td className="py-2 px-3 border-r border-fuchsia-500">
            <div className="relative w-100 h-100 overflow-hidden border border-fuchsia-500">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="transition-all duration-300 hover:scale-110"
              />
            </div>
          </td>
          <td className="py-2 px-3 font-medium border-r border-fuchsia-500 text-fuchsia-300 text-outline">
            {product.name}
          </td>
          <td className="py-2 px-3 text-right border-r border-fuchsia-500 text-cyan-300 text-outline">
            {product.fullPrice}
          </td>
          <td className="py-2 px-3 text-right text-fuchsia-300 text-outline">
            ${goosePrice.toFixed(2)}
          </td>
        </tr>
      );
  }