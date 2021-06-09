import Decimal from 'decimal.js-light';


export async function calculateDistance(x1: number, y1: number, x2: number, y2: number){   
    Decimal.set({
        precision: 8
    });
    const a = new Decimal(x2);
    const firstMinus = a.minus(x1);     

    const b = new Decimal(y2);
    const secondMinus = b.minus(y1);
    
    const firstPow = firstMinus.toPower(2);
    const secondPow = secondMinus.toPower(2);

    const sum = firstPow.plus(secondPow);
    const result = sum.squareRoot().toNumber()
    
    return result;
}

