interface IBookService {
    books: IBook[]
    authors: IAuthor[]
    getBooks(): IBook[]
    getBookById(bookId : number): IBook | undefined
    getAuthors(): IAuthor[]
    getAuthorById(authorId : number): IAuthor | undefined
    getBooksByAuthor(authorParam : string | number): IBook[]
    getAuthorByBookId(id : number): IAuthor
    search(searchParam : string | number): IBook[]
}

interface IBook {
    bookId: number
    title: string
    genre: string
    year: number
    authorId: number
}

interface IAuthor {
    authorId: number
    name: string
    birthday: number
}

class BookService implements IBookService {
    books: IBook[] = [
        { bookId: 1, title: "Flowers for Algernon", genre: "Fiction", year: 1966, authorId: 1 },
        { bookId: 2, title: "The Minds of Billy Milligan", genre: "Biography", year: 1982, authorId: 1 },
        { bookId: 3, title: "A Walk in the Woods", genre: "Travel", year: 1998, authorId: 2 },
        { bookId: 4, title: "The Sun Also Rises", genre: "Novel", year: 1925, authorId: 3 },
        { bookId: 4, title: "The Sun Also Rises", genre: "Novel", year: 1929, authorId: 3 },
    ]
    authors: IAuthor[] = [
        { authorId: 1, name: "Daniel Keyes", birthday: 1927 },
        { authorId: 2, name: "William McGuire Bryson", birthday: 1951 },
        { authorId: 3, name: "Ernest Miller Hemingway", birthday: 1899 },
    ]

    getBooks() : IBook[] | undefined {
        return this.books
    }

    getBookById(bookId : number) : IBook | undefined {
        return this.books.find((book: IBook) : boolean => book.bookId === bookId)
    }

    getAuthors() : IAuthor[] | undefined {
        return this.authors
    }

    getAuthorById(authorId : number) : IAuthor | undefined {
        return this.authors.find((author: IAuthor) : boolean => author.authorId === authorId)
    }

    getBooksByAuthor(authorParam : string | number) : IBook[] | undefined {
        if (typeof authorParam === "number") {
            return this.books.filter((book : IBook) : boolean => book.authorId === authorParam)
        } else if (typeof authorParam === "string") {
            return this.books.filter((book : IBook) : boolean => {
                const author : IAuthor = this.authors.find((author : IAuthor) : boolean => author.name === authorParam)
                return author ? book.authorId === author.authorId : false
            });
        }
        return [];
    }

    getAuthorByBookId(bookId : number) : IAuthor | undefined {
        const book : IBook = this.books.find((book : IBook) : boolean => book.bookId === bookId);
        return book ? this.authors.find((author: IAuthor) : boolean => author.authorId === book.authorId) : undefined;
    }

    search(searchParam : string | number) : IBook[] {
        if (typeof searchParam === "number") {
            return this.books.filter((book : IBook) : boolean => book.year === searchParam)
        }

        const author : IAuthor = this.authors.find((author : IAuthor) : boolean => author.name === searchParam)

        if (author) {
            return this.books.filter((book : IBook) : boolean => {
                return book.authorId === author.authorId
            });
        }

        return this.books.filter((book : IBook) : boolean => {
            return book.title.includes(searchParam) ||
                book.genre.includes(searchParam)
        });
    }
}

class Book implements IBook {
    static nextId = 1;

    bookId: number
    title: string
    genre: string
    year: number
    authorId: number

    constructor(title : string, genre : string, year : number, authorId : number) {
        this.bookId = Book.nextId++;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.authorId = authorId;
    }
}

class Author implements IAuthor {
    static nextId = 1;

    authorId: number
    name: string
    birthday: number

    constructor(name : string, birthday : number) {
        this.authorId = Author.nextId++;
        this.name = name;
        this.birthday = birthday;
    }
}

const bookService = new BookService();

console.log(bookService.search("Novel"));

console.log(bookService.getBooks());

console.log(bookService.getBooksByAuthor("Daniel Keyes"));

console.log(bookService.getAuthorByBookId(2));