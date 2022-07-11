export interface Token {
    /**
     * The user id
     */
    userId: number;

    /**
     * The array of permission's code. for exapmle: ['1-1', '2-2',...]
     */
    permissions: string[];

    /**
     * The date of creation token
     */
    madeAt: number; //<= Date (in millisecond)

    /**
    * The end life of token
    */
    endOfLife: number; //<= Date (in millisecond)

    /**
    * The date of last access to backend (last refrsh)
    */
    lastRefresh: number; //<= Date
}