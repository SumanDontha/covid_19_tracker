import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, total }) => {
  return (
    <div className="infoBox">
      <Card>
        <CardContent>
          {/* Title i.e. Coronavirus Cases */}
            <Typography className="infoBox__title" variant="textSecondary">
              {title}
            </Typography>
          {/* +120k Number of Cases */}
            <h2 className="infoBox__cases"> {cases} </h2>
          {/* 1.2M Total */}
            <Typography className="infoBox__total" variant="textSecondary">
              Total {total} 
            </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default InfoBox
