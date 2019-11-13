export interface Review {
    id: string;
    userId: string;
    createdDate: Date;
    lastEdited?: Date;
    travelDate: Date;
    location: string;
    placeId: string;
    rating: number;
    description: string;
}
