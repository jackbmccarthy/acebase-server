export class DatabaseLog {
    constructor(logRef) {
        this.logRef = logRef;
    }
    // /**
    //  * Logs an action initiated by a client/user with a positive or negative outcome. Used by `success` and `failure`
    //  * @param action action identifier
    //  * @param success whether the action was successful
    //  * @param details any additional details to be logged
    //  */
    // async event(action: string, success: boolean, details: any) {
    //     await this.logRef.push({ type: 'event', action, success, date: new Date(), ...details });
    // }
    // /**
    //  * Logs a successful action initiated by a client/user
    //  * @param action action identifier
    //  * @param details any additional details to be logged
    //  */
    // async success(action: string, details: any) {
    //     await this.event(action, true, details);
    // }
    // /**
    //  * Logs a failed action initiated by a client/user
    //  * @param action action identifier
    //  * @param code error code (also sent to the client)
    //  * @param details any additional details to be logged
    //  */
    // async failure(action: string, code: string, details: any) {
    //     await this.event(action, false, { code, ...details });
    // }
    /**
     * Logs an action initiated by a client/user with a positive or negative outcome. Used by `success` and `failure`
     * @param action action identifier
     * @param success whether the action was successful
     * @param details any additional details to be logged
     */
    async event(action, details) {
        await this.logRef.push({ type: 'event', action, date: new Date(), ...details });
    }
    /**
     * Logs a system warning
     * @param action action identifier
     * @param code warning code
     * @param details any additional details to be logged
     */
    async warning(action, code, details) {
        await this.logRef.push({ type: 'warning', action, code, date: new Date(), ...details });
    }
    /**
     * Logs a system error
     * @param action action identifier
     * @param code error code
     * @param details any additional details to be logged
     */
    async error(action, code, details, unexpectedError) {
        const errorDetails = unexpectedError instanceof Error
            ? { error: unexpectedError.stack ?? unexpectedError.message }
            : { error: unexpectedError?.message ?? unexpectedError?.toString() ?? null };
        await this.logRef.push({ type: 'error', action, code, date: new Date(), ...errorDetails, ...details });
    }
    /**
     * Query the logs
     * @returns
     */
    query() {
        return this.logRef.query();
    }
    /**
     * Reference to the logs database collection
     */
    get ref() {
        return this.logRef;
    }
}
//# sourceMappingURL=logger.js.map