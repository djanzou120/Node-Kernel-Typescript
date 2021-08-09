import {Request, Response} from 'express';

declare var global: any;

interface IPaginate {
    currentPage: number;
    items: any;
    totalItems: number;
    totalPages: number;
    nextPageUrl: string;
    previousPageUrl: string;
}

class Paginator {

    _req : Request;
    _page : any;
    _pageSize : any;

    constructor(req:Request) {
        this._req = req;
        this._page = req.query.page;
        //Set default page in case on missing
        if (isNaN(this._page))
            this._page = 1;
        //make sure the page is always positive
        this._page <= 0 ? this._page = 1 : this._page = Math.abs(this._page)
    }

    /**
     * Get target page
     * @returns {number}
     */
    get page() {
        return this._page;
    }

    /**
     * Get next page of items to take
     * @param pageSize number of items to get
     * @returns {number}
     */
    getOffset(pageSize:number) {
        this._pageSize = pageSize;
        return (this._page - 1) * pageSize;
    }

    /**
     * Paginator builder
     * @param data
     * @returns {{totalItems: *, nextPageUrl: (null|string), data: *, totalPages: number, currentPage: number}}
     */
    make(data:any) {
        data = JSON.parse(JSON.stringify(data))
        let nextPage : number = this._page + 1;
        let totalPage : number = Math.ceil(data.length / this._pageSize);
        return <IPaginate> {
            currentPage: this._page,
            items: data,
            totalItems: data.length,
            totalPages: totalPage,
            nextPageUrl: nextPage > totalPage ? null : this._buildPageUrl(nextPage),
            previousPageUrl: this._page <= 1 ? null : this._buildPageUrl(this._page - 1)
        }
    }

    /**
     * Build next page url
     * @param nextPage
     * @returns {string}
     * @private
     */
    _buildPageUrl(nextPage : number) {
        return this._req.protocol + '://' + this._req.get('host') + this._req.baseUrl + this._req.path + "?page=" + nextPage
    }

    /**
     * Check if is an array or single instance
     * @param models
     * @returns {arg is any[]}
     */
    isCollection(models : any) {
        return Array.isArray(models)
    }

    /**
     * Set pagination according to current page
     * @param options Sequelize Option
     */
    handlePagination(options : any){
        if (options.hasOwnProperty('limit')) {
            options.distinct = true;
            options.offset = global.paginator.getOffset(options.limit)
        }
    }
}

export default (req: Request, res: Response, next: () => any) => {
    global.paginator = new Paginator(req);
    next();
}

