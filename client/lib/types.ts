export interface Camera {
  id: number;
  name: string;
  location: string;
}

export interface Incident {
  id: number;
  camera: Camera;
  type:
    | "Unauthorised Access"
    | "Gun Threat"
    | "Face Recognised"
    | "Multiple Events";
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
}
