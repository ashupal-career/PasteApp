import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Paste Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The paste you're looking for doesn't exist or has been deleted.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Create New Paste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-semibold cursor-default"
              type="text"
              value={paste.title || "Untitled"}
              disabled
              readOnly
            />
          </div>

          <div className="mb-6">
            <textarea
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-gray-700 dark:text-gray-300 cursor-default resize-none"
              value={paste.content}
              disabled
              readOnly
              rows={20}
            />
          </div>

          <div className="flex gap-3">
            <Link
              to={`/?pasteId=${paste._id}`}
              className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Edit This Paste
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-gray-500 text-white font-medium hover:bg-gray-600 transition-colors"
            >
              Create New
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste