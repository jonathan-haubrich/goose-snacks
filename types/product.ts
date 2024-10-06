interface ProductInterface {
    id: number;
    votes: number;
    name: string;
    imageUrl: string;
    fullPrice: string;
    price: string;

    getCount(): number | null;
    calcGoosePrice(): number;
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

    calcGoosePrice(): number {
        var fullPriceValue = parseFloat(this.fullPrice.replace(/[$,]/g, '')); // Convert fullPrice to float
        fullPriceValue *= 1.10;

        // round to nearest $.25
        const count = this.getCount();
        if(count !== null) {

            const costPerItem = fullPriceValue / count;

            const goosePrice: number = Math.round(costPerItem * 4) / 4;

            return goosePrice; // Return the rounded price
        }

        return 1.00;
    }
}
