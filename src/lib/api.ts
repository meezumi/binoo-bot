const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface ApiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

    const response = await fetch(`${API_URL}/api${endpoint}`, mergedOptions);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

export interface Business {
    id: number;
    attributes: {
        name: string;
        slug: string;
        description: string;
        rating: number;
        reviewCount: number;
        priceRange: string;
        // Add other fields as needed
    };
}

export interface Location {
    id: number;
    attributes: {
        name: string;
        slug: string;
        description: string;
    };
}

export const api = {
    async getBusinesses(params: {
        location?: string;
        category?: string;
        page?: number;
        pageSize?: number;
    }) {
        const queryParams = new URLSearchParams();
        if (params.location) queryParams.set('filters[location][slug][$eq]', params.location);
        if (params.category) queryParams.set('filters[categories][slug][$eq]', params.category);
        if (params.page) queryParams.set('pagination[page]', params.page.toString());
        if (params.pageSize) queryParams.set('pagination[pageSize]', params.pageSize.toString());

        return fetchAPI<Business[]>(`/businesses?${queryParams.toString()}`);
    },

    async searchBusinesses(query: string) {
        const params = new URLSearchParams({
            'filters[name][$containsi]': query,
        });
        return fetchAPI<Business[]>(`/businesses?${params.toString()}`);
    },

    async getLocations() {
        return fetchAPI<Location[]>('/locations');
    },

    async getBusiness(slug: string) {
        const params = new URLSearchParams({
            'filters[slug][$eq]': slug,
        });
        return fetchAPI<Business[]>(`/businesses?${params.toString()}`);
    }
};