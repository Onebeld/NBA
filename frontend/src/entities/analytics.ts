export interface GraphicResponse {
    labels: string[];
    data: number[];
}

export interface AnalyticResponse {
    income: GraphicResponse;
    expense: GraphicResponse;
}