import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes])

  function createPaste() {
    if (!title.trim() && !value.trim()) {
      toast.error("Please add some content!");
      return;
    }

    const paste = {
      title: title || "Untitled",
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(), // FIXED: was createAt
    }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={createPaste}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
          </div>

          <div>
            <textarea
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-y"
              value={value}
              placeholder="Write your content here..."
              onChange={(e) => setValue(e.target.value)}
              rows={15}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home