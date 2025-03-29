import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, CheckCircle } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
            alt="Volunteers working together"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Make a Difference Today
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Join our community of volunteers and help create positive change in your local area.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Join VolunteerHub?
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Make an Impact</h3>
            <p className="mt-2 text-base text-gray-500">
              Contribute to meaningful causes and create positive change in your community.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Connect with Others</h3>
            <p className="mt-2 text-base text-gray-500">
              Meet like-minded individuals and build lasting relationships.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Calendar className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Flexible Schedule</h3>
            <p className="mt-2 text-base text-gray-500">
              Choose opportunities that fit your availability and interests.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Track Progress</h3>
            <p className="mt-2 text-base text-gray-500">
              Monitor your volunteer hours and impact through our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}