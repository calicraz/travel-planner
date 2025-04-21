#!/bin/bash
# Create a backup of the original file
cp src/components/TravelForm.js src/components/TravelForm.js.bak

# Keep only the essential parts of the file
sed -i '' '1,57d' src/components/TravelForm.js     # Remove duplicate imports at the top
sed -i '' '/^import.*$/d' src/components/TravelForm.js  # Remove duplicate imports throughout
sed -i '' '/^<search>/d' src/components/TravelForm.js   # Remove search tags
sed -i '' '/^<\/search>/d' src/components/TravelForm.js # Remove search end tags
sed -i '' '/export default TravelForm;/d' src/components/TravelForm.js # Remove duplicate exports

# Add the proper imports at the top of the file
cat > src/components/TravelForm.js.tmp << 'EOL'
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faBriefcase, faGlassMartini } from '@fortawesome/free-solid-svg-icons';
import airports from '../data/airports';
import config from '../config';
import './TravelForm.css';

EOL

# Append the original file
cat src/components/TravelForm.js >> src/components/TravelForm.js.tmp

# Add export at the end
echo "export default TravelForm;" >> src/components/TravelForm.js.tmp

# Replace original with fixed version
mv src/components/TravelForm.js.tmp src/components/TravelForm.js

echo "File has been cleaned up. Original backup saved as TravelForm.js.bak"
