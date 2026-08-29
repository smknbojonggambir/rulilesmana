import React from 'react';
import { X, Calendar, MapPin, Users, Camera, Tag, Download } from 'lucide-react';
import { ActivityDoc } from '../types';
import { LazyImage } from './LazyImage';
import { Breadcrumb } from './Breadcrumb';

interface ActivityImageModalProps {
  activity: ActivityDoc | null;
  onClose: () => void;
}

export const ActivityImageModal: React.FC<ActivityImageModalProps> = ({
  activity,
  onClose,
}) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bento-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 relative space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Dokumentasi', sectionId: 'dokumentasi', onClick: onClose },
            { label: activity.title, active: true },
          ]}
          onNavigateHome={onClose}
        />

        {/* Large Image Preview */}
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black">
          <LazyImage
            src={activity.imageUrl}
            alt={activity.title}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-600 text-white shadow-md">
              {activity.category}
            </span>
          </div>
        </div>

        {/* Information Header */}
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {activity.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-red-500" />
              {activity.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {activity.date}
            </span>
            {activity.participantCount && (
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" />
                {activity.participantCount}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          {activity.caption}
        </p>
      </div>
    </div>
  );
};
