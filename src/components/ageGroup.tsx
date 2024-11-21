'use client';
import React, { useEffect, useState } from 'react';
import { AgeGroupDto} from "@/types/apiTypes";
import { getRequest } from '../lib/apiHelpers';

interface AgeGroupDropdownProps {
  setSelectedAgeGroup: (ageGroupId: string) => void;
}
const AgeGroupDropdown: React.FC<AgeGroupDropdownProps>= ({setSelectedAgeGroup}) => {
    const [ageGroups, setAgeGroups] = useState<AgeGroupDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgeGroups = async () => {
            try {
                const data: AgeGroupDto[] = await getRequest({ url: 'Selection/agegroups' });
                setAgeGroups(data);
            } catch (err) {
                setError('Failed to load age groups.');
            } finally {
                setLoading(false);
            }
        };

        fetchAgeGroups();
    }, []);

    return (
      <div className="mb-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <label className="block text-gray-700 font-semibold mb-2"></label>
          <select className="border border-gray-300 rounded-md p-2 w-full"
           onChange={(e) => setSelectedAgeGroup(e.target.value)}
           >
                <option value="">Select Age Group</option>
                {ageGroups.map((age) => (
                  <option key={age.ageGroupId} value={age.ageGroupId}>
                      {age.groupName}
                  </option>
              ))}
          </select>
      </div>
  );
};

export default AgeGroupDropdown;




