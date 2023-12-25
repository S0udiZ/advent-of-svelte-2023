import axios from 'axios';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data } = await axios.get('https://advent.sveltesociety.dev/data/2023/day-three.json');
    return { data };
}) satisfies PageServerLoad;