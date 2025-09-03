export interface ActionResponse<T = unknown> {
  data: T;
  ok: boolean;
  error: string;
}

export interface PhotosResponse extends ActionResponse<Photo[]> {
  data: Photo[];
}

export interface PhotosGetParams {
  page?: number;
  total?: number;
  user?: string;
}

export interface PhotoData {
  photo: Photo;
  comments: Comment[];
}

export interface User {
  id: number;
  nome: string;
  username: string;
  email: string;
}

export interface ActionResponse<T = unknown> {
  data: T;
  ok: boolean;
  error: string;
}

export interface Comment {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
  comment_date: string;
}

export interface Photo {
  id: string;
  author: string;
  title: string;
  date: string;
  src: string;
  personagem: string;
  epoca: string;
  acessos: number;
  total_comments: number;
}

export interface ActionSuccess<T = unknown> {
  success: true;
  data: T;
  error?: never;
}

export interface ActionError {
  success: false;
  error: string;
  data?: never;
}

export type ActionResult<T = unknown> = ActionSuccess<T> | ActionError;

export interface CommentResponse {
  comment: {
    _id: string;
    comment_post_ID: string;
    comment_author: string;
    comment_content: string;
    comment_date: string;
  };
  message: string;
}

// Stats

export interface FotoMaisAcessada {
  id: string;
  title: string;
  acessos: number;
  src: string;
  author: string;
}

export interface RankingFoto {
  id: string;
  title: string;
  acessos: number;
  src: string;
  author: string;
}

export interface TendenciaItem {
  name: string;
  acessos: number;
}

export interface StatsData {
  totalAccessos: number;
  fotosPostadas: number;
  mediaAcessos: number;
  fotoMaisAcessada: FotoMaisAcessada;
  rankingFotos: RankingFoto[];
  tendenciaPerformance: TendenciaItem[];
}
