import { App } from './app';

async function main() {
    const app = new App();
    try {
        await app.listen();
    } catch (error) {
        console.log('Oops, we had problems to connect our server');
    };
}

main();