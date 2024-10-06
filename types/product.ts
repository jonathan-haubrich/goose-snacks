import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductInterface {
    id: number;
    votes: number;
    name: string;
    imageUrl: string;
    fullPrice: string;
    price: string;

    getCount(): number | null;
    calcGoosePrice(): Promise<number>;
}

export class Product implements ProductInterface {
    id: number;
    votes: number;
    name: string;
    imageUrl: string;
    fullPrice: string;
    price: string;

    constructor(id: number, votes: number, name: string, imageUrl: string, fullPrice: string | undefined, price: string) {
        this.id = id;
        this.votes = votes;
        this.name = name;
        this.imageUrl = imageUrl;
        this.fullPrice = fullPrice ? fullPrice : price;
        this.price = price;
    }

    static fromData(data: any): Product {
        return new Product(
            data.id,
            data.votes,
            data.name,
            data.imageUrl,
            data.fullPrice,
            data.price
        );
    }

    getCount(): number | null {
        // Updated regex to be case-insensitive and match the format (\d+)[- ]?count
        const regex = /(\d+)[- ]?count/i; // 'i' makes it case-insensitive
        const match = this.name.match(regex);

        if (match && match[1]) {
            return parseInt(match[1], 10); // Convert the extracted digits to a number
        }

        return null; // Return null if no match is found
    }

    async calcGoosePrice(): Promise<number> {
        // Fetch the first price modifier entry
        const priceModifier = await prisma.priceModifiers.findFirst();

        // defaults
        var profitPercentage = .25;
        var roundingModifier = .10;
        if (priceModifier) {
            // Destructure the result to unpack the fields
            profitPercentage = priceModifier.profitPercentage ? priceModifier.profitPercentage : profitPercentage;
            roundingModifier = priceModifier.roundingModifier ? priceModifier.roundingModifier : roundingModifier;
        }
        

        var fullPriceValue = parseFloat(this.fullPrice.replace(/[$,]/g, '')); // Convert fullPrice to float
        fullPriceValue *= (1.0 + profitPercentage);

        // round to nearest roundingModifier
        const count = this.getCount();
        if(count !== null) {

            const costPerItem = fullPriceValue / count;

            const roundFactor = 1 / roundingModifier;
            const goosePrice: number = Math.round(costPerItem * roundFactor) / roundFactor;

            return goosePrice; // Return the rounded price
        }

        return 1.00;
    }
}
