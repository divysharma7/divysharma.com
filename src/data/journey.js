import { Calendar, Award, Users } from 'lucide-vue-next';

export const journeyItems = [
    {
        name: 'My Journey',
        description: 'Overview of my learning and career journey.',
        icon: Calendar,
        href: '/journey',
    },
    {
        name: 'Certificates & Achievements',
        description: 'A curated list of certificates and achievements.',
        icon: Award,
        href: '/journey/certificates',
    },
    {
        name: 'Gurus & Mentors',
        description: 'The incredible people who guided me, believed in my potential, and helped shape my journey.',
        icon: Users,
        href: '/journey/mentors',
    },
];
