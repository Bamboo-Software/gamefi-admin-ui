declare global {
  export interface RegisterResponse {
    message: string;
    token: string;
    success: boolean
  }

  export interface LoginResponse {
    message: string;
    token: string;
    success: boolean
  }


  export interface LoginRequest {
    email: string;
    password: string;
  }

  
  export interface UserResponse {
    user: User;
    token: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
}
export {};