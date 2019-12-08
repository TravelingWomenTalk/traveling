import { User } from './user.model';

export interface Review {
    id: string;
    user: User;
    createdDate: Date;
    lastEdited?: Date;
    travelDate: Date;
    location: string;
    placeId: string;
    rating: number;
    description: string;
}
