class NblocksError extends Error {
    constructor(msg: string){
        super(`NBlocksError: ${msg}`)
    }
}