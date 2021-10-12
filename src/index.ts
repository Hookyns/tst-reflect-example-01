import { getType }           from "tst-reflect";
import { ServiceCollection } from "./ServiceCollection";
import { ServiceProvider }   from "./ServiceProvider";

interface IPrinter
{
    printHelloWorld();
    printText(text: string);
}

class ConsolePrinter implements IPrinter
{
    private readonly console: Console;

    constructor(console: Console)
    {
        this.console = console;
    }

    printHelloWorld()
    {
        this.console.log("Hello World!");
    }

    printText(text: string)
    {
        this.console.log(text);
    }
}

interface IService
{
    doJob(number: number);
}

class Service implements IService
{
    constructor(private printer: IPrinter, private console: Console)
    {
        console.log("Service is using printer:", printer.constructor.name);
    }

    doJob(number: number)
    {
        const job = number + number;
        this.printer.printText(`${number} + ${number} = ${job}`);
    }
}

//-----------------------------------------

const collection = new ServiceCollection();

collection.addTransient<IService, Service>();
collection.addTransient<IPrinter, ConsolePrinter>();
collection.addTransient(getType<Console>(), console);

const provider = new ServiceProvider(collection);

//-----------------------------------------

const printer = provider.getService<IPrinter>(getType<IPrinter>());
console.log("printer is instanceof ConsolePrinter:", printer instanceof ConsolePrinter);

printer.printHelloWorld();

const service = provider.getService<IService>();
service.doJob(10);

printer.printText("Try it on repl.it");
printer.printText("And good bye!");