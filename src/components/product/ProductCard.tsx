import { ProductType } from '@/types/ProductType';
import Image from 'next/image';
import React from 'react'

export default function ProductCard({id, title,description, price, thumbnail}:ProductType) {
  return (
    <div key={id} className=" rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
          unoptimized
            width={500}
            height={300}
        />
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
          NEW
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">${price}</span>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
