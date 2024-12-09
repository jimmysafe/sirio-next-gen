import { apiClient } from "@/lib/client";

export async function getCourses() {
    const client = await apiClient();
    return client.find({
        collection: 'courses',
        limit: 10,
        where: {
            _status: {
                equals: 'published'
            }
        },
    })
}

export async function getCourseById(id: number) {
    const client = await apiClient();
    const course = await client.findByID({
        id,
        collection: 'courses',
    })

    return course;
}


export async function getCourseBySlug(slug: string) {
    const client = await apiClient();
    const courses = await client.find({
        collection: 'courses',
        limit: 1,
        depth: 10,
        where: {
            slug: {
                equals: slug
            }
        }
    })
    if (courses.docs.length === 0) return null;
    return courses.docs[0];
}

export async function getCoursesBaseInfo() {
    const client = await apiClient();
    return client.find({
        collection: 'courses',
        limit: 10,
        where: {
            _status: {
                equals: 'published'
            }
        },
        select: {
            _status: true,
            title: true,
            slug: true,
            description: true,
            hero_image: true
        }
    })
}

