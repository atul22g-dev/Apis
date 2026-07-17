import indexData from '@/docs/index.json';
import projectsData from '@/docs/Projects/Projects.json';
import miniProjectsData from '@/docs/Projects/Mini_Projects.json';
import jsLibrariesData from '@/docs/Projects/Js_Libaries.json';
import moviesData from '@/docs/Movies/index.json';
import productsData from '@/docs/Products/index.json';
import backendData from '@/docs/Projects/Backend.json';
import repositoriesData from '@/docs/Projects/Repositories.json';
import appData from '@/docs/Projects/App.json';
import cdnsData from '@/docs/Projects/Cdns.json';
import wallpapersData from '@/docs/Wallpapers/index.json';
import phpProjectsData from '@/docs/Projects/PhpProjects.json';
import incompleteProjectsData from '@/docs/Projects/Incomplete_projects.json';
import mongodbData from '@/docs/Projects/MongoDB.json';
import packagesData from '@/docs/Projects/Packages.json';

// Types
export interface IndexEntry {
  id: number;
  name: string;
  src: string;
  auth?: {
    type: string;
    required: boolean;
    ref: string;
  };
}

export interface Project {
  id: string | number;
  title: string;
  src?: string;
  demo?: string;
  desc?: string;
  img?: string;
}

export interface Movie {
  Key: string;
  Name: string;
  Poster: string;
  Title: string;
  Desc: string;
  Release: string;
  Language: string;
  Subtitles: string;
  Size: string;
  Quality: string;
  Format: string;
  IMDB: string;
  Genres: string;
  Country: string;
  Movie_story: string;
  Screenshots1?: string;
  Screenshots2?: string;
  Screenshots3?: string;
  Screenshots4?: string;
  downloads: Array<{
    Key?: string;
    key?: string;
    Download_title: string;
    Download: string;
  }>;
}

export interface Product {
  id: string;
  name: string;
  company?: string;
  price: number;
  colors?: string[];
  description: string;
  category: string;
  featured?: boolean;
  shipping?: boolean;
  stock: number;
  reviews: number;
  stars: number;
  image: string;
  images?: Array<{
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
  }>;
}

export interface Wallpaper {
  id: number;
  Name: string;
  url: string;
}

export interface Cdn {
  name: string;
  src?: string;
  demo?: string;
}

export interface Package {
  name: string;
  src: string;
  demo: string;
}

export interface MongoDBProject {
  name: string;
  'db-check': string;
  status: string;
}

export interface AuthConfig {
  name: string;
  version: string;
  base_url: string;
  docs: string;
  note: string;
  authentication_methods: Array<{
    method: string;
    description: string;
    header?: string;
    query_param?: string;
    format?: string;
  }>;
  example_requests: Array<{
    description: string;
    curl: string;
  }>;
}

// Category info for the landing page
export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

// Exported data
export const indexEntries = indexData as IndexEntry[];
export const projects = projectsData as Project[];
export const miniProjects = miniProjectsData as Project[];
export const jsLibraries = jsLibrariesData as Project[];
export const movies = moviesData as Movie[];
export const products = productsData as Product[];
export const wallpapers = wallpapersData as Wallpaper[];
export const backendProjects = backendData as Project[];
export const repositories = repositoriesData as Project[];
export const apps = appData as Project[];
export const cdns = cdnsData as Cdn[];
export const phpProjects = phpProjectsData as Project[];
export const incompleteProjects = incompleteProjectsData as Project[];
export const mongodbProjects = mongodbData as MongoDBProject[];
export const packages = packagesData as Package[];

// Auth documentation (without exposing actual secrets)
export const authConfig: AuthConfig = {
  name: 'Atual APIs',
  version: '2.0',
  base_url: 'http://localhost:3000',
  docs: '/api/auth',
  note: 'Credentials are managed via environment variables (.env.local). See .env.example for required variables.',
  authentication_methods: [
    {
      method: 'api_key',
      description: 'Send the API key as an X-API-Key header or api_key query parameter.',
      header: 'X-API-Key',
      query_param: 'api_key',
    },
    {
      method: 'bearer_token',
      description: 'Send the API key as a Bearer token in the Authorization header.',
      header: 'Authorization',
      format: 'Bearer <token>',
    },
  ],
  example_requests: [
    {
      description: 'Using API key header',
      curl: `curl -H "X-API-Key: YOUR_API_KEY" http://localhost:3000/api/projects`,
    },
    {
      description: 'Using Bearer token',
      curl: `curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/movies`,
    },
  ],
};

// Category definitions
export const categories: CategoryInfo[] = [
  {
    id: 'projects',
    name: 'Projects',
    slug: 'projects',
    description: 'Complete web development projects',
    icon: 'FolderCog',
    count: projects.length,
    color: '#0ea5e9'
  },
  {
    id: 'mini-projects',
    name: 'Mini Projects',
    slug: 'mini-projects',
    description: 'Small, focused projects and experiments',
    icon: 'Zap',
    count: miniProjects.length,
    color: '#f59e0b'
  },
  {
    id: 'js-libraries',
    name: 'JS Libraries',
    slug: 'js-libraries',
    description: 'JavaScript libraries and resources',
    icon: 'BookOpen',
    count: jsLibraries.length,
    color: '#10b981'
  },
  {
    id: 'movies',
    name: 'Movies',
    slug: 'movies',
    description: 'Movie collection with downloads',
    icon: 'Film',
    count: movies.length,
    color: '#ef4444'
  },
  {
    id: 'products',
    name: 'Products',
    slug: 'products',
    description: 'Tech products and accessories',
    icon: 'ShoppingBag',
    count: products.length,
    color: '#8b5cf6'
  },
  {
    id: 'backend',
    name: 'Backend',
    slug: 'backend',
    description: 'Backend projects and APIs',
    icon: 'Server',
    count: backendProjects.length,
    color: '#06b6d4'
  },
  {
    id: 'repositories',
    name: 'Repositories',
    slug: 'repositories',
    description: 'Open source repositories',
    icon: 'GitBranch',
    count: repositories.length,
    color: '#22c55e'
  },
  {
    id: 'apps',
    name: 'Apps',
    slug: 'apps',
    description: 'Mobile and desktop applications',
    icon: 'Smartphone',
    count: apps.length,
    color: '#eab308'
  },
  {
    id: 'cdns',
    name: 'CDNs',
    slug: 'cdns',
    description: 'CDN resources and links',
    icon: 'Globe',
    count: cdns.length,
    color: '#a855f7'
  },
  {
    id: 'wallpapers',
    name: 'Wallpapers',
    slug: 'wallpapers',
    description: 'Curated wallpaper collection',
    icon: 'Image',
    count: wallpapers.length,
    color: '#ec4899'
  },
  {
    id: 'php-projects',
    name: 'PHP Projects',
    slug: 'php-projects',
    description: 'PHP-based web projects',
    icon: 'Code2',
    count: phpProjects.length,
    color: '#6366f1'
  },
  {
    id: 'incomplete-projects',
    name: 'Incomplete',
    slug: 'incomplete-projects',
    description: 'Work in progress projects',
    icon: 'Construction',
    count: incompleteProjects.length,
    color: '#f97316'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    slug: 'mongodb',
    description: 'MongoDB database projects',
    icon: 'Database',
    count: mongodbProjects.length,
    color: '#14b8a6'
  },
  {
    id: 'packages',
    name: 'Packages',
    slug: 'packages',
    description: 'Published npm packages',
    icon: 'Package',
    count: packages.length,
    color: '#78716c'
  }
];