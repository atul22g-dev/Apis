import { NextRequest, NextResponse } from 'next/server';
import {
  projects, miniProjects, jsLibraries, movies, products,
  backendProjects, repositories, apps, cdns, wallpapers,
  phpProjects, incompleteProjects, mongodbProjects, packages,
} from '@/lib/data';
import { validateAuth, unauthorizedResponse, isRouteProtected } from '@/lib/auth';

const dataMap: Record<string, any[]> = {
  projects,
  'mini-projects': miniProjects,
  'js-libraries': jsLibraries,
  movies,
  products,
  backend: backendProjects,
  repositories,
  apps,
  cdns,
  wallpapers,
  'php-projects': phpProjects,
  'incomplete-projects': incompleteProjects,
  mongodb: mongodbProjects,
  packages,
  index: [],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  // Check auth for protected routes
  const pathname = `/api/${category}`;
  if (isRouteProtected(pathname)) {
    const auth = validateAuth(request);
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error);
    }
  }

  // Return data
  const data = dataMap[category];
  if (!data) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
