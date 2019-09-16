<template>
  <div>
    <select id="search_license" data-search-prefix="license:" data-search-type="Repositories">
      <option value>Any license</option>
      <optgroup label="Licenses">
        <option value="afl-3.0">Academic Free License v3.0</option>
        <option value="agpl-3.0">GNU Affero General Public License v3.0</option>
        <option value="apache-2.0">Apache License 2.0</option>
        <option value="artistic-2.0">Artistic License 2.0</option>
        <option value="bsd-2-clause">BSD 2-Clause "Simplified" License</option>
        <option value="bsd-3-clause">BSD 3-Clause "New" or "Revised" License</option>
        <option value="bsd-3-clause-clear">BSD 3-Clause Clear License</option>
        <option value="bsl-1.0">Boost Software License 1.0</option>
        <option value="cc-by-4.0">Creative Commons Attribution 4.0 International</option>
        <option value="cc-by-sa-4.0">Creative Commons Attribution Share Alike 4.0 International</option>
        <option value="cc0-1.0">Creative Commons Zero v1.0 Universal</option>
        <option value="ecl-2.0">Educational Community License v2.0</option>
        <option value="epl-1.0">Eclipse Public License 1.0</option>
        <option value="epl-2.0">Eclipse Public License 2.0</option>
        <option value="eupl-1.1">European Union Public License 1.1</option>
        <option value="eupl-1.2">European Union Public License 1.2</option>
        <option value="gpl-2.0">GNU General Public License v2.0</option>
        <option value="gpl-3.0">GNU General Public License v3.0</option>
        <option value="isc">ISC License</option>
        <option value="lgpl-2.1">GNU Lesser General Public License v2.1</option>
        <option value="lgpl-3.0">GNU Lesser General Public License v3.0</option>
        <option value="lppl-1.3c">LaTeX Project Public License v1.3c</option>
        <option value="mit">MIT License</option>
        <option value="mpl-2.0">Mozilla Public License 2.0</option>
        <option value="ms-pl">Microsoft Public License</option>
        <option value="ms-rl">Microsoft Reciprocal License</option>
        <option value="ncsa">University of Illinois/NCSA Open Source License</option>
        <option value="ofl-1.1">SIL Open Font License 1.1</option>
        <option value="osl-3.0">Open Software License 3.0</option>
        <option value="postgresql">PostgreSQL License</option>
        <option value="unlicense">The Unlicense</option>
        <option value="upl-1.0">Universal Permissive License v1.0</option>
        <option value="wtfpl">Do What The F*ck You Want To Public License</option>
        <option value="zlib">zlib License</option>
      </optgroup>
      <optgroup label="License families">
        <option value="cc">Creative Commons</option>
        <option value="gpl">GNU General Public License</option>
        <option value="lgpl">GNU Lesser General Public License</option>
      </optgroup>
    </select>
  </div>
</template>
<script>
export default {
  name: "LicenseSelect"
};
</script>