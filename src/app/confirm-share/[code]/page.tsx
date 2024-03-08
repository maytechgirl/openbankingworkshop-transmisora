'use client';
import React, { useEffect, useState } from "react";
import SharedDataList from "../../../components/SharedDataList/SharedDataList";
import { useParams } from 'next/navigation';

type Slug = {
  code: string;
};

export default function ConfirmShare({ params} : {params: { code: string }}) {

  const { code } = useParams<Slug>();

    return (
        <main >
          <SharedDataList code={code} />
        </main>
    );
}

