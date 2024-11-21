'use client'
import { getRequest } from '../lib/apiHelpers'; 
import { useEffect, useState } from 'react';
import { ThemeGroupDto } from "@/types/apiTypes";


interface ThemeGroupDropdownProps {
  setSelectedThemeGroup: (themeId: string) => void;
}

const ThemeGroupDropdown: React.FC<ThemeGroupDropdownProps> = ({setSelectedThemeGroup}) => {

    const [themes, setThemes] = useState<ThemeGroupDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
   

    useEffect(() => {
      const fetchThemeGroups = async () => {
        try {
          const data = await getRequest({ url: 'Selection/themes' }); // Adjust endpoint as needed
          setThemes(Array.isArray(data) ? data : []);
        } catch (err) {
          setError('Failed to load age groups.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchThemeGroups();
    }, []);
    return (
      <div className="mb-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <label className="block text-gray-700 font-semibold mb-2"></label>
          <select className="border border-gray-300 rounded-md p-2 w-full"
            onChange={(e) => setSelectedThemeGroup(e.target.value)}
          >
              <option value="">Select a Theme</option>
              {themes.map((theme) => (
                  <option key={theme.themeId} value={theme.themeId}>
                      {theme.themeName}
                  </option>
              ))}
          </select>
      </div>
  );
};  
export default ThemeGroupDropdown;