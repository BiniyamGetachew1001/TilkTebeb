"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveNote, getContentNotes, updateNote, deleteNote } from "@/lib/offline-storage"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Loader2, Plus, Trash2, Save } from "lucide-react"

interface NotesPanelProps {
  contentId: string
}

export function NotesPanel({ contentId }: NotesPanelProps) {
  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadNotes()
  }, [contentId])

  const loadNotes = async () => {
    try {
      setIsLoading(true)
      const contentNotes = await getContentNotes(contentId)
      setNotes(contentNotes)
    } catch (error) {
      console.error("Error loading notes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    try {
      setIsSaving(true)

      const noteId = await saveNote(contentId, {
        text: newNote,
        position: 0, // In a real app, you'd track the current reading position
      })

      // Add to local state
      const newNoteObj = {
        id: noteId,
        contentId,
        text: newNote,
        position: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setNotes([newNoteObj, ...notes])
      setNewNote("")

      toast({
        title: "Note added",
        description: "Your note has been saved",
      })
    } catch (error) {
      console.error("Error adding note:", error)
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditNote = (note: any) => {
    setEditingNote(note.id)
    setEditText(note.text)
  }

  const handleSaveEdit = async () => {
    if (!editingNote || !editText.trim()) return

    try {
      setIsSaving(true)

      await updateNote(editingNote, {
        text: editText,
      })

      // Update local state
      setNotes(
        notes.map((note) =>
          note.id === editingNote ? { ...note, text: editText, updatedAt: new Date().toISOString() } : note,
        ),
      )

      setEditingNote(null)

      toast({
        title: "Note updated",
        description: "Your note has been updated",
      })
    } catch (error) {
      console.error("Error updating note:", error)
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId)

      // Update local state
      setNotes(notes.filter((note) => note.id !== noteId))

      toast({
        title: "Note deleted",
        description: "Your note has been deleted",
      })
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-medium mb-4">Notes</h3>

      <div className="mb-4">
        <Textarea
          placeholder="Add a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="resize-none"
          rows={3}
        />
        <Button onClick={handleAddNote} className="w-full mt-2" disabled={!newNote.trim() || isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="ml-2">Loading notes...</span>
          </div>
        ) : notes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No notes yet. Add your first note above.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-md p-3 text-sm">
                {editingNote === note.id ? (
                  <>
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="resize-none mb-2"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingNote(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit} disabled={!editText.trim() || isSaving}>
                        {isSaving ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <Save className="h-3 w-3 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-2">{note.text}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditNote(note)} className="hover:text-primary">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteNote(note.id)} className="hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

