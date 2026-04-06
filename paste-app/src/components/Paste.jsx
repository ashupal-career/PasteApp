import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          type="search"
          placeholder="🔍 Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                  {paste.title || "Untitled"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 whitespace-pre-wrap">
                  {paste.content.substring(0, 200)}{paste.content.length > 200 ? "..." : ""}
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: paste.title,
                          text: paste.content,
                        }).catch(() => toast.error("Share cancelled"));
                      } else {
                        navigator.clipboard.writeText(window.location.origin + `/pastes/${paste._id}`);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors text-sm font-medium"
                  >
                    Share
                  </button>
                </div>

                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Created: {formatDate(paste.createdAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchTerm ? "No pastes found matching your search." : "No pastes yet. Create your first paste!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paste