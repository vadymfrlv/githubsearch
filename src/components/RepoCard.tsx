import React from 'react';

import { Repo } from '../models/models';

export const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <div className="border flex flex-col justify-center text-center min-h-[115px] overflow-y-scroll py-3 px-3 rounded mt-2 mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <h2 className="text-lg font-bold">{repo.full_name}</h2>
      <p className="text-sm">
        Forks: <span className="font-bold mr-2">{repo.forks}</span>
        Watchers: <span className="font-bold">{repo.watchers}</span>
      </p>
      <p className="text-sm font-thin mb-0">{repo?.description}</p>
    </div>
  );
};
