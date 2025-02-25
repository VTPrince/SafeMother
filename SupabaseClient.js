import { createClient } from "@supabase/supabase-js";

const project_url = import.meta.env.VITE_project_url;
const anon_key = import.meta.env.VITE_anon_key;

export const supabase = createClient(`${project_url}`, `${anon_key}`);