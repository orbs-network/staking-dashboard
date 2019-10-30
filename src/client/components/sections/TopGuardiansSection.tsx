/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Link } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { usePosStore } from '../../store/storeHooks';
import { theme } from '../base/Theme';
import { Typography } from '../base/Typography';
import { Section } from './Section';

const ListContainer = styled.ul`
  color: ${theme.darkTextColor};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const ListItem = styled.li`
  padding-bottom: ${theme.sizes.SIZE_SMALL_2};
`;

export const TopGuardiansSection = observer(() => {
  const posStore = usePosStore();

  return (
    <Section
      title={`Top ${posStore.topGuardians.length} guardians`}
      helpText='The top 3 Guardians with biggest amount of Orbs tokens delegated to them'
    >
      <ListContainer>
        {posStore.topGuardians.map((g, idx) => (
          <ListItem key={g.id}>
            <Typography variant='x-small' dataTestId={`guardian-${idx}`}>
              <Link href={g.homePage} target={'_blank'} color={'inherit'} data-testid={`guardian-link-${idx}`}>
                {g.displayName}
              </Link>
            </Typography>
          </ListItem>
        ))}
      </ListContainer>
    </Section>
  );
});
