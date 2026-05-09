import { schools, type SchoolCategory } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";

export interface SelectableSchool {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  type: "Private" | "Public";
  category: SchoolCategory;
  knownFor: string;
}

export const allSelectableSchools: SelectableSchool[] = [
  ...schools.map((s) => ({
    slug: s.slug,
    name: s.name,
    shortName: s.shortName,
    location: s.location,
    state: s.state,
    type: s.type,
    category: s.category,
    knownFor: s.knownFor,
  })),
  ...extraColleges.map((e) => ({
    slug: e.slug,
    name: e.name,
    shortName: e.shortName,
    location: e.location,
    state: e.state,
    type: e.type,
    category: e.category,
    knownFor: e.knownFor,
  })),
].sort((a, b) => a.name.localeCompare(b.name));
