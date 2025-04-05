export interface UserType {
    _id?: string;
    name: string;
    email: string;
    password?: string; // optional in case you don't expose it
    role?: 'user' | 'driver' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface RideType {
    _id?: string;
    pickup: string;
    drop: string;
    driverName: string;
    carType: string;
    fare: number;
    status: 'Booked' | 'Completed' | 'Cancelled';
    userId: string;
    driverId?: string;
    createdAt?: Date;
  }
  
  export interface DriverType {
    _id?: string;
    name: string;
    phone: string;
    carType: string;
    licensePlate: string;
    isAvailable: boolean;
    location?: string;
  }
  
  export interface BookingInput {
    pickup: string;
    drop: string;
    carType: string;
  }
  