import React from 'react'
import AutomaticNumbering from './_components/automatic-numbering'
import DocumentNumbers from './_components/document-numbers'
import NotesPanel from './_components/notes-panel'

const page = () => {
  return (
    <div className="container mx-auto h-full max-h-screen overflow-auto p-6 ">
    <h1 className="text-3xl font-bold mb-8 text-primary">Numbering</h1>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6  pb-20">
      <div className="lg:col-span-3 space-y-6">
        <AutomaticNumbering />
        <DocumentNumbers />
      </div>

      <div className="lg:col-span-1 ">
        <NotesPanel />
      </div>
    </div>
  </div>
  )
}

export default page