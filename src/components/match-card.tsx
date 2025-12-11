"use client";

import { MatchResponse } from '@/lib/football';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

interface MatchCardProps {
  match: MatchResponse;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { fixture, league, teams, goals, score } = match;

  const isLive = fixture.status.short === "1H" || fixture.status.short === "2H" || fixture.status.short === "HT";
  const isFinished = fixture.status.short === "FT" || fixture.status.short === "AET" || fixture.status.short === "PEN";
  const isPending = fixture.status.short === "NS" || fixture.status.short === "TBD";

  const getStatusColor = () => {
    if (isLive) return "bg-red-500";
    if (isFinished) return "bg-gray-600";
    return "bg-blue-500";
  };

  const getStatusText = () => {
    if (isLive && fixture.status.elapsed) return `${fixture.status.elapsed}'`;
    if (fixture.status.short === "HT") return "MI-TEMPS";
    if (isFinished) return "TERMINÉ";
    if (isPending) return "À VENIR";
    return fixture.status.short;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src={league.flag}
            alt={league.country}
            width={24}
            height={18}
            className="rounded"
          />
          <span className="text-sm font-semibold text-gray-700">
            {league.name}
          </span>
        </div>
        <span
          className={`${getStatusColor()} text-white text-xs font-bold px-3 py-1 rounded-full`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Date/Time */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
        <Clock className="w-4 h-4" />
        <span>{formatDate(fixture.date)}</span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-12 h-12 mb-2">
            <Image
              src={teams.home.logo}
              alt={teams.home.name}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm font-bold text-center text-gray-800 max-w-[100px] truncate">
            {teams.home.name}
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center px-6">
          {isPending ? (
            <div className="text-2xl font-bold text-gray-400">VS</div>
          ) : (
            <>
              <div className="text-4xl font-bold text-gray-900">
                {goals.home ?? 0} - {goals.away ?? 0}
              </div>
              {isLive && (
                <div className="flex items-center gap-1 text-xs text-red-500 font-semibold mt-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  EN DIRECT
                </div>
              )}
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-12 h-12 mb-2">
            <Image
              src={teams.away.logo}
              alt={teams.away.name}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm font-bold text-center text-gray-800 max-w-[100px] truncate">
            {teams.away.name}
          </p>
        </div>
      </div>

      {/* Halftime Score */}
      {(score.halftime.home !== null || score.halftime.away !== null) && !isPending && (
        <p className="text-xs text-gray-500 text-center py-2 border-t border-gray-100">
          Mi-temps: {score.halftime.home} - {score.halftime.away}
        </p>
      )}

      {/* Venue */}
      {fixture.venue.name && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
          <MapPin className="w-4 h-4" />
          <span>{fixture.venue.name}</span>
        </div>
      )}
    </div>
  );
}
