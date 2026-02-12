import React, { useState } from 'react'
import Papa from 'papaparse'
import { supabase } from '../lib/supabaseClient'

const DashboardUpload = () => {
    const [uploading, setUploading] = useState(false)
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)

    const generateSlug = (name) => {
        const minified = name.toLowerCase().replace(/[^a-z0-9]/g, '')
        const random = Math.random().toString(36).substring(2, 8)
        return `${minified}-${random}`
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        setError(null)

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const guests = results.data.map(row => {
                    if (!row.family_name || !row.max_attendees) return null
                    return {
                        family_name: row.family_name,
                        max_attendees: parseInt(row.max_attendees),
                        invite_slug: generateSlug(row.family_name)
                    }
                }).filter(Boolean)

                if (guests.length === 0) {
                    setError('No valid guests found in CSV. Ensure headers are "family_name" and "max_attendees".')
                    setUploading(false)
                    return
                }

                try {
                    const { data, error } = await supabase
                        .from('guests')
                        .insert(guests)
                        .select()

                    if (error) throw error
                    setResults(prev => [...prev, ...data])
                    alert(`Successfully added ${data.length} guests!`)
                } catch (err) {
                    setError(err.message)
                } finally {
                    setUploading(false)
                }
            },
            error: (err) => {
                setError(err.message)
                setUploading(false)
            }
        })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Upload Guest List (CSV)</h2>
            <p className="text-sm text-gray-500 mb-4">
                CSV headers must be: <code>family_name</code>, <code>max_attendees</code>
            </p>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />

            {uploading && <p className="mt-2 text-blue-600">Processing...</p>}
            {error && <p className="mt-2 text-red-600">Error: {error}</p>}

            {results.length > 0 && (
                <div className="mt-8">
                    <h3 className="font-bold mb-2">Generated Invites ({results.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Family Name</th>
                                    <th className="p-2 text-left">Link</th>
                                    <th className="p-2 text-left">Slug</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((guest) => (
                                    <tr key={guest.id} className="border-b">
                                        <td className="p-2">{guest.family_name}</td>
                                        <td className="p-2">
                                            <a
                                                href={`/invite/${guest.invite_slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Open Invite
                                            </a>
                                        </td>
                                        <td className="p-2 font-mono text-xs">{guest.invite_slug}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardUpload
