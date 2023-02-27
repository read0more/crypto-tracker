import React, { WheelEvent, useState } from 'react';
import { getCoinDetailPrice } from '@/api';
import { CoinDetailOutletContext } from '@/pages/Detail';
import { CoinDetailPrice } from '@/types/CoinPaprika';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useOutletContext } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '@/atoms';

const INITIAL_LENGTH = 20; // 한 화면에 보여줄 데이터의 수. 수가 커질 수록 zoom out
const ZOOM_RANGE = 2;

export default function ChartTab() {
  const [visibleDataLength, setVisibleDataLength] = useState(INITIAL_LENGTH);
  const { coinId } = useOutletContext<CoinDetailOutletContext>();
  const { isLoading, data } = useQuery<CoinDetailPrice[]>({
    queryKey: ['chart', coinId],
    queryFn: () => getCoinDetailPrice(coinId),
  });
  const isDark = useRecoilValue(isDarkAtom);

  const chartData = Array.isArray(data)
    ? data?.map((item) => ({
        x: new Date(item.time_open),
        y: [item.open, item.high, item.low, item.close],
      }))
    : [];

  const minIndex = chartData.length - 1 - visibleDataLength;
  const maxIndex = chartData.length - 1;

  const options: ApexOptions = {
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    chart: {
      toolbar: {
        // toolbar를 숨기고 기본 선택을 좌우로 드래그 가능한 pan으로
        show: false,
        autoSelected: 'pan',
      },
    },
    title: {
      text: `${coinId.toUpperCase()} Chart`,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (value) => new Date(+value * 1000).toLocaleString(),
      },
    },
  };

  if (chartData.length && options.xaxis) {
    // 차트 줌 관련 기능
    options.xaxis.min = chartData[minIndex].x.getTime(); // 차트에서 보여줄 가장 왼쪽 데이터의 x축 값
    options.xaxis.max = chartData[maxIndex].x.getTime(); // 차트에서 보여줄 가장 오른쪽 데이터의 x축 값
  }

  const zoomChart = (event: WheelEvent<HTMLDivElement>) => {
    let newVisibleDataLength = visibleDataLength;

    if (event.deltaY < 0) {
      newVisibleDataLength -= ZOOM_RANGE;
    } else if (event.deltaY > 0) {
      newVisibleDataLength += ZOOM_RANGE;
    }

    if (newVisibleDataLength > 0 && newVisibleDataLength < chartData.length) {
      setVisibleDataLength(newVisibleDataLength);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div onWheel={zoomChart}>
      <ReactApexChart
        options={options}
        series={[{ data: chartData }]}
        type='candlestick'
        height={500}
      />
    </div>
  );
}
