import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tag: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface MoodEntry {
  id: string;
  emojiUrl: string;
  label: string;
  note: string;
  createdAt: number;
}

interface RecoveryState {
  journals: JournalEntry[];
  moodHistory: MoodEntry[];
  
  // Journal Actions
  addJournal: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJournal: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournal: (id: string) => void;
  
  // Mood Actions
  addMoodEntry: (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => void;
}

export const useRecoveryStore = create<RecoveryState>()(
  persist(
    (set) => ({
      journals: [],
      moodHistory: [],

      addJournal: (entry) => set((state) => ({
        journals: [
          {
            ...entry,
            id: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          ...state.journals, // Add to top
        ],
      })),

      updateJournal: (id, updatedEntry) => set((state) => ({
        journals: state.journals.map((journal) =>
          journal.id === id
            ? { ...journal, ...updatedEntry, updatedAt: Date.now() }
            : journal
        ),
      })),

      deleteJournal: (id) => set((state) => ({
        journals: state.journals.filter((journal) => journal.id !== id),
      })),

      addMoodEntry: (entry) => set((state) => ({
        moodHistory: [
          {
            ...entry,
            id: Date.now().toString(),
            createdAt: Date.now(),
          },
          ...state.moodHistory, // Add to top
        ],
      })),
    }),
    {
      name: 'naqey-recovery-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
