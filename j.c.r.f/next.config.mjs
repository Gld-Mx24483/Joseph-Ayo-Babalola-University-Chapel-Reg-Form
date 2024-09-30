// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    env: {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'dui4el4tx',
      NEXT_PUBLIC_CLOUDINARY_API_KEY: '993337669766481',
      NEXT_PUBLIC_CLOUDINARY_API_SECRET: 'lF4AqcOAUF52pc3Srx7bDp9Uk18',
    },
  };
  
  export default nextConfig;