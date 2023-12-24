import type { PageServerLoad } from './$types';
import axios from 'axios';

export const load = (async () => {
    const { data } = await axios.get('https://advent.sveltesociety.dev/data/2023/day-one.json');
    return { data };
}) satisfies PageServerLoad;