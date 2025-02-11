import React from "react";

const TrainingDetail = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">
          상추 재배 가이드
        </h1>

        <section>
          <h2 className="text-xl font-bold text-green-700">파종</h2>
          <p className="mt-2 text-gray-700">
            파종상의 온도는 20℃전후가 적당하며, 저온에서는 발아가 늦어지고
            고온에서는 발아율이 떨어진다. 따라서 저온기에는 온상을 설치하고,
            평균기온이 15℃ 이상일 때는 냉상을 설치해야 한다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold text-green-700">파종량</h2>
          <p className="mt-2 text-gray-700">
            파종량은 10a당 약 2㎗로 실면적 10평 정도면 충분하다. 파종 후 종자를
            판자로 살짝 눌러주고, 상토를 덮어주면 발아율이 향상된다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold text-green-700">가식</h2>
          <p className="mt-2 text-gray-700">
            1차 가식은 본엽 1.5~2매 시 6×3~4cm로 하며, 고온기와 저온기에서 가식
            기간이 다르다. 또한, 엽고병 예방을 위해 다이센M-45를 희석하여
            살포하고, 온도를 적절히 유지해야 한다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold text-green-700">정식</h2>
          <p className="mt-2 text-gray-700">
            본엽이 5~7장 전개되었을 때 정식하며, 적절한 이랑 높이와 포기 사이를
            유지하는 것이 중요하다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold text-green-700">시비</h2>
          <p className="mt-2 text-gray-700">
            상추는 생육기간이 짧고 뿌리가 잘 발달되지 않으므로 완숙퇴비와 적절한
            비료 시용이 필요하다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold text-green-700">수확 및 저장</h2>
          <p className="mt-2 text-gray-700">
            잎상추는 정식 후 30일경부터 수확이 가능하며, 결구상추는 45~50일경에
            수확한다. 저장은 결구상추에 대해 냉장 및 냉동 저장 방법이 사용된다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TrainingDetail;
