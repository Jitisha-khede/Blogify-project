'use client';

import Image from 'next/image';
import React from 'react';
// import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import { HoverEffect } from './ui/card-container';
import Link from 'next/link';

export default function Write() {
	return (
		<div id='Projects' className='w-full mx-auto px-8'>
			<h1 className='text-4xl font-bold mb-12 mt-16 '>Blogs</h1>
			<HoverEffect items={projects} />
		</div>
	);
}
const projects = [
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
	{
		title: 'Blog Title',
		description: '#1 #2 ... ... #n',
		link: '#',
		image: '/images/default-blog.png',
		github: 'https://github.com/utkarshmandloi12/Portfolio',
	},
];
